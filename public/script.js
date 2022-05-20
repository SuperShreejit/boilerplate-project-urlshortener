const deleteButton = document.getElementById('delete')

deleteButton.addEventListener('click', handleDelete)

const handleDelete = (e) => {
  const urlId = e.target.getAttribute('data-urlId')
  fetch(`/api/shorturl/${urlId}`, {
    method: 'DELETE'
  }).then(res => redirect('/')).catch(error => console.error(error))
}