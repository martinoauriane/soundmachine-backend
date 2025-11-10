export const pageNotFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found — The requested resource does not exist.",
    });
};
