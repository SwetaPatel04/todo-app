// This is a JavaScript file — it controls how our page BEHAVES
// JavaScript makes our page interactive and functional

// This function runs when user clicks "Add Task" button
function addTask() {

  // Find the input box using its id="taskInput"
  const input = document.getElementById('taskInput');
  
  // Get the text the user typed, .trim() removes extra spaces
  const taskText = input.value.trim();

  // Check if the input is empty
  if (taskText === '') {
    alert('Please enter a task!'); // Show popup message
    return; // Stop the function here, don't add empty task
  }

  // Create a new <li> element (a new task item)
  const li = document.createElement('li');
  
  // Add HTML content inside the new task item
  // This adds the task text + Done and Delete buttons
  li.innerHTML = `
    <span>${taskText}</span>
    <!-- span shows the task text the user typed -->

    <div class="actions">
    <!-- div holds our two action buttons -->

      <button class="done-btn" onclick="toggleDone(this)">✅ Done</button>
      <!-- Done button calls toggleDone() when clicked -->
      <!-- "this" means "this button that was clicked" -->

      <button class="delete-btn" onclick="deleteTask(this)">🗑️ Delete</button>
      <!-- Delete button calls deleteTask() when clicked -->

    </div>
  `;

  // Find the task list using id="taskList" and add our new task to it
  document.getElementById('taskList').appendChild(li);
  
  // Clear the input box after adding the task
  input.value = '';
}

// This function marks a task as Done or undoes it
function toggleDone(btn) {

  // .closest('li') finds the parent <li> of the clicked button
  const li = btn.closest('li');
  
  // .toggle adds 'done' class if not there, removes it if it is
  // 'done' class in CSS adds strikethrough and grey color
  li.classList.toggle('done');
}

// This function deletes a task
function deleteTask(btn) {

  // Find the parent <li> of the clicked Delete button
  const li = btn.closest('li');
  
  // .remove() completely removes the task from the page
  li.remove();
}

// This adds keyboard support — press Enter to add a task
document.getElementById('taskInput')
  .addEventListener('keypress', function(e) {
    // e.key tells us which key was pressed
    if (e.key === 'Enter') {
      addTask(); // Call addTask() if Enter was pressed
    }
  });