import $ from 'jquery';

const $applyContainer = $('#apply');
const $form = $applyContainer.find('#apply-form');
const rawForm = $form.get(0);
const $callout = $applyContainer.find('.callout');

function submit() {
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
    data,
    dataType: 'json',
    headers: {
      Accept: 'application/json'
    }
  })
  .done(function(data) {
    if (data.success) {
      $callout.show();
      $form.hide();
    }
  });
}

$form.on('submit', (event) => {
  event.preventDefault();
  submit();
});
