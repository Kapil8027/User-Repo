document.addEventListener("DOMContentLoaded", function() {
    var checkbox = document.querySelector('.enableButtonCheckbox');
    var button = document.querySelector('.btn-primary');
    
    if (checkbox && button) {
        checkbox.addEventListener('change', function() {
            button.disabled = !this.checked;
        });
    } else {
        console.error('Checkbox or button not found in the document.');
    }
});