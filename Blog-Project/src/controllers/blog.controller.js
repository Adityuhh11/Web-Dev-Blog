import {Blog} from "../model/blog.model.js";
import {Subscriber} from "../model/subscriber.model.js";
import asyncHandler from "../utils/asynchandler.js";
import sendEmail from "../utils/sendEmail.js";

const publishedFilter = {
    $or: [{ status: "published" }, { status: { $exists: false } }]
};

const isPublishing = (status) => status === "published";

const validateForPublish = ({ title, description, content }) => {
    if (!title?.trim() || !description?.trim() || !content?.trim()) {
        return "Please provide title, description, and content to publish";
    }
    return null;
};

const normalizeDraftFields = ({ title, description, content }) => ({
    title: title?.trim() || "Untitled draft",
    description: description?.trim() || "",
    content: content?.trim() || ""
});

const getIdString = (value) => {
    if (!value) return null;
    return (value._id ?? value).toString();
};

const isOwnerOrMasterKey = (blog, req) => {
    if (req.headers["x-master-key"] === process.env.MASTER_API_KEY) return true;
    return getIdString(blog.owner) === getIdString(req.user);
};

const notifySubscribers = (blog, req) => {
    Subscriber.find({}).then(subscribers => {
        if (subscribers.length > 0) {
            const blogUrl = `${req.protocol}://${req.get("host")}/post/${blog._id}`;
            const subject = `New Blog Post: ${blog.title}`;
            const message = `Check out the new blog post: ${blog.title}\n\n${blog.description}\n\nRead more here: ${blogUrl}`;
            const htmlMessage = `<p>Check out the new blog post: <strong>${blog.title}</strong></p><p>${blog.description}</p><a href="${blogUrl}">Read more here</a>`;
            
            subscribers.forEach(sub => {
                sendEmail({
                    email: sub.email,
                    subject: subject,
                    message: message,
                    htmlMessage: htmlMessage
                }).catch(err => console.error("Email send error for", sub.email, err));
            });
        }
    }).catch(error => {
        console.error("Failed to fetch subscribers for email notification:", error);
    });
};

const uploadBlog = asyncHandler(async(req,res)=>{
    const { title, description, content, status = "published" } = req.body;

    if (isPublishing(status)) {
        const error = validateForPublish({ title, description, content });
        if (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    const fields = isPublishing(status)
        ? { title: title.trim(), description: description.trim(), content: content.trim() }
        : normalizeDraftFields({ title, description, content });

    const newBlog = await Blog.create({
        ...fields,
        owner: req.user.id,
        status
    });

    if (isPublishing(status)) {
        notifySubscribers(newBlog, req);
    }

    if (req.headers["x-master-key"]) {
        return res.status(201).json({ success: true, blogId: newBlog._id, status: newBlog.status });
    }

    if (isPublishing(status)) {
        return res.redirect(`/post/${newBlog._id}`);
    }
    res.redirect("/drafts");
});

const deleteBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;

    if (!blogId) {
        return res.status(400).render("404", { message: "No blog ID provided." });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).render("404", { message: "Blog post not found." });
    }

    if (!isOwnerOrMasterKey(blog, req)) {
        res.status(403);
        throw new Error("You are not authorized to delete this blog");
    }
    
    await Blog.findByIdAndDelete(blogId);

    if (blog.status === "draft") {
        return res.redirect("/drafts");
    }
    return res.redirect("/archive"); 
});

const recentBlogs = asyncHandler(async(req,res)=>{
    const blogs = await Blog.find(publishedFilter).sort({ createdAt: -1 }).limit(5);
    res.render("home", { 
        blogs: blogs ,
    });
});

const AllBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find(publishedFilter).sort({ createdAt: -1 });
    res.render("archive", { 
        blogs: blogs 
    });
});

const listDrafts = asyncHandler(async (req, res) => {
    const drafts = await Blog.find({ owner: req.user.id, status: "draft" }).sort({ updatedAt: -1 });
    res.render("drafts", { drafts });
});

const getBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blogData = await Blog.findById(blogId).populate("owner", "username");

    if (!blogData) {
        return res.status(404).render("404");
    }

    if (blogData.status === "draft") {
        return res.status(404).render("404");
    }

    res.render("post", {
        blog: {
            ...blogData._doc,
            date: blogData.createdAt.toLocaleDateString()
        }
    });
});

const findBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const blogData = await Blog.findById(blogId).populate("owner", "name");

    if (!blogData) {
        return res.status(404).render("404");
    }

    if (!isOwnerOrMasterKey(blogData, req)) {
        res.status(403);
        throw new Error("You are not authorized to edit this blog");
    }

    res.render("update", {
        blog: {
            ...blogData._doc,
            date: blogData.createdAt.toLocaleDateString()
        }
    });
});

const updateBlog = asyncHandler(async(req,res)=>{
    const { title, description, content, status } = req.body;
    const blogId = req.params.id;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
        return res.status(404).render("404", { message: "Blog post not found." });
    }

    if (!isOwnerOrMasterKey(existingBlog, req)) {
        res.status(403);
        throw new Error("You are not authorized to update this blog");
    }

    const nextStatus = status || existingBlog.status;

    if (isPublishing(nextStatus)) {
        const error = validateForPublish({ title, description, content });
        if (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    const fields = isPublishing(nextStatus)
        ? { title: title.trim(), description: description.trim(), content: content.trim() }
        : normalizeDraftFields({ title, description, content });

    const wasDraft = existingBlog.status === "draft";
    const blog = await Blog.findByIdAndUpdate(blogId, {
        ...fields,
        status: nextStatus
    }, { new: true });

    if (wasDraft && isPublishing(nextStatus)) {
        notifySubscribers(blog, req);
    }

    if (isPublishing(nextStatus)) {
        return res.redirect(`/post/${blog._id}`);
    }
    res.redirect("/drafts");
});

export {
    recentBlogs,
    AllBlogs,
    getBlog,
    findBlog,
    uploadBlog,
    deleteBlog,
    updateBlog,
    listDrafts
};
