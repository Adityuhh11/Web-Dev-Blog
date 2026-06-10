import { doubleCsrf } from "csrf-csrf";

const isProduction = process.env.NODE_ENV === "production";

const {
    generateCsrfToken,
    doubleCsrfProtection,
    invalidCsrfTokenError,
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    getSessionIdentifier: (req) => req.cookies?.accessToken || req.ip,
    cookieName: isProduction ? "__Host-csrf" : "csrf-token",
    cookieOptions: {
        httpOnly: true,
        sameSite: "strict",
        secure: isProduction,
        path: "/",
    },
    getCsrfTokenFromRequest: (req) => {
        const headerToken = req.headers["x-csrf-token"];
        if (typeof headerToken === "string" && headerToken.length > 0) {
            return headerToken;
        }

        const bodyToken = req.body?._csrf;
        if (typeof bodyToken === "string" && bodyToken.length > 0) {
            return bodyToken;
        }

        return undefined;
    },
    skipCsrfProtection: (req) => {
        const masterApiKey = req.headers["x-master-key"];
        return Boolean(
            masterApiKey &&
            process.env.MASTER_API_KEY &&
            masterApiKey === process.env.MASTER_API_KEY
        );
    },
});

export const attachCsrfToken = (req, res, next) => {
    res.locals.csrfToken = generateCsrfToken(req, res);
    next();
};

export const csrfProtection = (req, res, next) => {
    doubleCsrfProtection(req, res, next);
};

export const handleCsrfError = (err, req, res, next) => {
    if (err !== invalidCsrfTokenError) {
        return next(err);
    }

    if (req.path === "/login") {
        return res.status(403).render("login", {
            error: "Invalid or expired form submission. Please try again.",
        });
    }

    if (req.path === "/subscribe") {
        return res.status(403).json({
            message: "Invalid or expired request. Please refresh and try again.",
        });
    }

    return res.status(403).send("Invalid or expired form submission. Please go back and try again.");
};
