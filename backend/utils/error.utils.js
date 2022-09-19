module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email"))
        errors.email = "Veuillez vérifier la bonne saisie de votre email";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit contenir plus de 6 caractères";

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email"))
        errors.email = "Combinaison email/mot de passe incorrecte";

    if (err.message.includes("password"))
        errors.password = "Combinaison email/mot de passe incorrecte";

    return errors
};

// module.exports.uploadErrors = (err) => {
//     let errors = { format: "", maxSize: "" };

//     if (err.message.includes("invalid file"))
//         errors.format = "Format incompatible";

//     if (err.message.includes("max size"))
//         errors.maxSize = "Taille de l'image trop importante (> 500ko)";

//     return errors
// };