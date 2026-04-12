import { Page } from "../model/page.model.js";

// Fetch the about page or fallback to default
export const getAboutPage = async (req, res) => {
    try {
        let page = await Page.findOne({ identifier: "about" });
        if (!page) {
            // Default content if not found in db
            page = {
                title: "About Me",
                content: `<p>Hello my name is Aditya sai prem, I am from India, Bengaluru, Studying software engineering at CODE university of applied sciences, Berlin. 
I started these blogs as a way to document i dont know what for now, but i am hoping thoughts ideas, or opinions about things, did not really make it for other people, i have not found a sure purpose for these, maybe acts a journal i dont know or talk about stuff happening around, or document my jouney, I am going to write about things from a persepctive of a 19 year old south indian kid in berlin which i think is pretty niche so feel freee to browse and read stuff, if there arent any stuff well i gues you are early then so ggs.</p>`
            };
        }
        res.render("about", { page });
    } catch (error) {
        console.error("Error fetching about page:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render edit about page
export const getEditAboutPage = async (req, res) => {
    try {
        let page = await Page.findOne({ identifier: "about" });
        if (!page) {
            page = {
                title: "About Me",
                content: `<p>Hello my name is Aditya sai prem, I am from India, Bengaluru, Studying software engineering at CODE university of applied sciences, Berlin. 
I started these blogs as a way to document i dont know what for now, but i am hoping thoughts ideas, or opinions about things, did not really make it for other people, i have not found a sure purpose for these, maybe acts a journal i dont know or talk about stuff happening around, or document my jouney, I am going to write about things from a persepctive of a 19 year old south indian kid in berlin which i think is pretty niche so feel freee to browse and read stuff, if there arent any stuff well i gues you are early then so ggs.</p>`
            };
        }
        res.render("editabout", { page });
    } catch (error) {
        console.error("Error fetching edit about page:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update about page content
export const updateAboutPage = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        await Page.findOneAndUpdate(
            { identifier: "about" },
            { title, content },
            { upsert: true, new: true }
        );
        
        res.redirect("/about");
    } catch (error) {
        console.error("Error updating about page:", error);
        res.status(500).send("Internal Server Error");
    }
};
