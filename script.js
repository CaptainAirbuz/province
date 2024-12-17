document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращает отправку формы по умолчанию

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');

    if (password !== confirmPassword) {
        messageDiv.textContent = 'Пароли не совпадают!';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
        messageDiv.style.display = 'block';
        return;
    }

    // Вы можете добавить здесь проверку на валидность почты и прочие проверки
    // Здесь будет код для отправки данных на сервер (если требуется).
    // Пример успешной регистрации (замените на ваш реальный код)
        messageDiv.textContent = 'Регистрация успешна!';
        messageDiv.classList.remove('error');
        messageDiv.classList.add('success');
        messageDiv.style.display = 'block';
        // Очищаем поля формы после успешной регистрации
        document.getElementById('registrationForm').reset();
    
});