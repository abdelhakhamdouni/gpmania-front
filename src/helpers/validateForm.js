export function isEmailValide(email) {
  let email_regex = /([\w-\.]{5,50}@[\w\.]{3,}\.{1}[\w]+)/;
  return email.match(email_regex);
}

export function isPasswordValide(password) {
  let mdp_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
  return password.match(mdp_regex);
}
