// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Mobile menu
var menuToggle = document.querySelectorAll('.menu-toggle');

for (var i = 0; i < menuToggle.length; i++) {
  menuToggle[i].addEventListener('click', function(e){
    document.body.classList.toggle('menu--opened');
    e.preventDefault();
  },false);
}

document.body.classList.remove('menu--opened');

window.addEventListener('resize', function () {
  if (menuToggle.offsetParent === null) {
    document.body.classList.remove('menu--opened');
  }
}, true);

// Accordion
var accordions = document.querySelectorAll('.faq-accordion');
Array.from(accordions).forEach((accordion) => {
  var ba = new BadgerAccordion(accordion, {
    headerClass: '.accordion-trigger',
    panelClass: '.accordion-panel',
    panelInnerClass: '.accordion-content',
    openMultiplePanels: true
  });
});


const contactForm = document.getElementById('js-contact-form');
if (contactForm) {
  const serialize = function (form) {
    var field,
      l,
      s = [];
  
    if (typeof form == 'object' && form.nodeName == "FORM") {
      var len = form.elements.length;
  
      for (var i = 0; i < len; i++) {
        field = form.elements[i];
        if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
          if (field.type == 'select-multiple') {
            l = form.elements[i].options.length;
  
            for (var j = 0; j < l; j++) {
              if (field.options[j].selected) {
                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
              }
            }
          }
          else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
          }
        }
      }
    }
    return s.join('&').replace(/%20/g, '+');
  };
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const theForm = e.currentTarget;
    const formData = "form-name="+ theForm.name + "&" + serialize(theForm);
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
    }
    
    fetch(
      "/",
      options
    )
    .then(function (response) {
      window.location.assign(theForm.action);
    })
    .catch(function (error) {
      console.log(error);
    });
  })
}