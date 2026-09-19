export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    message: 4000,
};

export function validateContactForm(form = {}) {
    const errors = {};
    const name = String(form.name ?? "").trim();
    const email = String(form.email ?? "").trim();
    const message = String(form.message ?? "").trim();

    if (name.length < 2) {
        errors.name = "Please enter your name.";
    } else if (name.length > CONTACT_LIMITS.name) {
        errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (message.length < 10) {
        errors.message = "Please share a little more detail so I can respond usefully.";
    } else if (message.length > CONTACT_LIMITS.message) {
        errors.message = `Please keep your message under ${CONTACT_LIMITS.message.toLocaleString()} characters.`;
    }

    return errors;
}
