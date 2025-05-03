let snakespeedbox = document.getElementById('snakespeed');
window.speed = parseInt(snakespeedbox.value) + 5;
snakespeedbox.addEventListener('input', ()=>{
    window.speed = parseInt(snakespeedbox.value) + 5;
});