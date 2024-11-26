document.addEventListener("DOMContentLoaded", function () {
    // Utility to get today’s date in YYYY-MM-DD format
    function getTodayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  
    // Load goals and display popup if goals exist for today
    window.onload = function () {
      chrome.storage.local.get(["goals", "goalsDate"], function (data) {
        const today = getTodayDate();
  
        // If goals exist and are for today, show them in the popup
        if (data.goals && data.goalsDate === today) {
          showPopup(data.goals);
        }
      });
    };
  
    // Show the goals in the popup and hide the goal form
    function showPopup(goals) {
      const popup = document.getElementById("popup");
      const goalForm = document.getElementById("goalForm"); // Goal form container
      const goalsList = document.getElementById("goalsList");
      const closeButton = document.getElementById("closePopup");
  
      // Hide the goal form
      goalForm.style.display = "none";
  
      // Show the goals in the popup
      goalsList.innerHTML = "";
      goals.split("\n").forEach(goal => {
        const li = document.createElement("li");
        li.textContent = goal;
        goalsList.appendChild(li);
      });
  
      popup.style.display = "flex"; // Show the popup
  
      // Hide the "Okay" button
      closeButton.style.display = "none";
    }
  
    // Save the goals for the day and open a new tab (simulating the default new tab behavior)
    const saveGoalsButton = document.getElementById("saveGoals");
    if (saveGoalsButton) {
      saveGoalsButton.addEventListener("click", function () {
        const newGoals = document.getElementById("newGoals").value.trim();
        const today = getTodayDate();
  
        if (newGoals) {
          // Save the goals to local storage with today's date
          chrome.storage.local.set({ goals: newGoals, goalsDate: today }, function () {
            alert("Today's goals saved!");
            document.getElementById("newGoals").value = "";
  
            // Open a new tab (simulating the default new tab behavior)
            chrome.tabs.create({ url: "chrome://newtab" });
          });
        } else {
          alert("Please enter some goals before saving.");
        }
      });
    }
  });
  