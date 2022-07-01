var input = {
  form: $('#form'),
  all: $('.form__input'),
  name: $('#name'),
  password: $('#password'),
  re_password: $('#re_password'),
  email: $('#email'),
  errorBlock: $('#error'),
};
var isError = false;

var validate = {
  name: function () {
     var $this = $(this);
     var $nameLength = input.name.val().length;

     if ($nameLength < 6 || $nameLength > 15) {
        $this.parent().addClass('is-error');
        input.errorBlock.show()
           .html('Your name must be between 6 and 15 characters');
        isError = true;
     } else {
        $this.parent().removeClass('is-error');
        input.errorBlock.hide();
     }
  },
  password: function() {
     var $this = $(this);
     var $passValue = $this.val();
     var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"); // via https://goo.gl/T3bkmt

     if (pattern.test($passValue)) {
        $this.parent().removeClass('is-error');
        input.errorBlock.hide();
     } else {
        $this.parent().addClass('is-error');
        input.errorBlock.show()
           .html('At least 8 characters, include 1 uppercase letter and 1 number');
        isError = true;
     }
  },
  re_password: function() {
     var $this = $(this);
     var $passValue = input.password.val();

     if ($this.val() == '' || $this.val() !== $passValue) {
        $this.parent().addClass('is-error');
        input.errorBlock.show()
           .html('Password do not match');
        isError = true;
     } else {
        $this.parent().removeClass('is-error');
        input.errorBlock.hide();
     }
  },
  email: function() {
     var $this = $(this);
     var $emailValue = $this.val();
     var pattern = new RegExp("([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))"); // via https://goo.gl/D4Hvcs

     if (pattern.test($emailValue)) {
        $this.parent().removeClass('is-error');
        input.errorBlock.hide();
     } else {
        $this.parent().addClass('is-error');
        input.errorBlock.show()
           .html('Your email address is invalid');
        isError = true;
     }
  },
};

// Detect if an input has value in it with CSS :not([value=""])
// via https://goo.gl/xPZqNV
function setValue() {
  var $this = $(this);

  $this.on('keyup', function() {
     var inputValue = $this.val();
     $this.attr('value', inputValue);
  });
}

function checkFinal() {
  isError = false;

  input.name.trigger('blur');
  input.password.trigger('blur');
  input.re_password.trigger('blur');
  input.email.trigger('blur');

  if (isError) {
     alert('Please fill out form correctly');
     return false;
  }

  return true;
}

input.name.on('blur', validate.name);
input.password.on('blur', validate.password);
input.re_password.on('blur', validate.re_password);
input.email.on('blur', validate.email);
input.all.each(setValue);
$('#form').on('submit', checkFinal);
