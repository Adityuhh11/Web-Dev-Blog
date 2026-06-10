(function () {
    const modal = document.getElementById('delete-modal');
    if (!modal) return;

    const messageEl = document.getElementById('delete-modal-message');
    const confirmBtn = document.getElementById('delete-modal-confirm');
    let pendingForm = null;

    function openModal(form, title, fallback) {
        pendingForm = form;
        const displayTitle = title && title.trim() ? title.trim() : (fallback || 'this post');
        messageEl.innerHTML =
            'This will permanently delete <strong>' + escapeHtml(displayTitle) + '</strong>.';
        modal.hidden = false;
        document.body.classList.add('modal-open');
        confirmBtn.focus();
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        pendingForm = null;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('.delete-trigger');
        if (!trigger) return;

        const form = trigger.closest('.delete-form');
        if (!form) return;

        e.preventDefault();
        e.stopPropagation();
        openModal(form, trigger.dataset.blogTitle || '', trigger.dataset.fallback);
    });

    confirmBtn.addEventListener('click', function () {
        if (pendingForm) {
            pendingForm.submit();
        }
        closeModal();
    });

    modal.querySelectorAll('[data-delete-modal-dismiss]').forEach(function (el) {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
})();
