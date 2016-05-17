import $ from 'jquery';

const $form = $("#apply-form");
const rawForm = $form.get(0);
$form.on('submit', (event) => {
  event.preventDefault();

  const data = {
    name: rawForm.name.value,
    email: rawForm.email.value,
    phone: rawForm.phone.value,
    subject: rawForm.subject.value,
    content: rawForm.content.value
  };

  $.ajax({
    url: '/apply',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: data,
    headers: {
      Accept: 'application/json'
    }
  })
  .done(function(data) {
    console.log(data);
  });

});
