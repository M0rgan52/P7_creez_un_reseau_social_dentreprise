module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("to be unique"))
        errors.email = "Email incorrecte ou déjà pris";

    if (err.message.includes("Veuillez entrer une adresse email correcte"))
        errors.email = "Veuillez entrer une adresse email correcte";

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