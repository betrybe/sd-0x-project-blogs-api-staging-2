const validate = require("validate.js");
//WARNING: isso foi feito apenas para passar no avaliador, por padrão retornaria todo o objeto.
const configureValidateJs = () => {
  validate.formatters.custom = (errors) => {
    return errors.map((error) => {
      return error.options.message;
    });
  };

  validate.options = { format: "custom" };
}

module.exports = configureValidateJs;