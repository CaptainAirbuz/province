document.addEventListener('DOMContentLoaded', function() {
    const commentsContainer = document.getElementById('comments-container');
    const addCommentForm = document.getElementById('add-comment-form');
    
    // Загрузка комментариев из localStorage
    function loadComments() {
        commentsContainer.innerHTML = ''; // Очищаем контейнер
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }

    // Сохранение комментариев в localStorage
    function saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    }


    // Обработчик отправки формы
    addCommentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Отмена отправки формы

        const author = document.getElementById('comment-author').value;
        const text = document.getElementById('comment-text').value;

        if (author && text) {
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            const newComment = { author: author, text: text };
            comments.push(newComment);
            saveComments(comments); // Сохраняем обновленные комментарии

             // Отображаем комментарии
            loadComments()
            // Очищаем форму
            addCommentForm.reset();
        }
    });


    // Инициализация: загружаем комментарии при загрузке страницы
    loadComments();
});