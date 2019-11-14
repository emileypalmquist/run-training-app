(function () {

  showLoginPage();
  createAccountModal();
  loginModal();
  listenForLoginSubmit();
  listenForCreateSubmit();
  addRunModal();
  newGoalModal();
  goalCreate();
  listenForGoalSelection();
  listenForRunSubmit();
  addEventListenerDeleteAccount();
  editAccountModal();
  listenForEditSubmit()
  let runnerGoal;
  let runner;
  
  function showLoginPage() {
    document.getElementById('main-page').style.display = "none"
    document.getElementById('login-page').style.display = ""
  }
  
  //create modal
  function createAccountModal() {

    const modal1 = document.getElementById("modal-create");
    const trigger1 = document.getElementById("trigger-create");
    const closeButton1 = document.getElementById("close-create");

    function toggleModal1() {
      modal1.classList.toggle("show-modal");
    }

    function windowOnClick1(event) {
      if (event.target === modal1) {
        toggleModal1();
      }
    }
    trigger1.addEventListener("click", toggleModal1);
    closeButton1.addEventListener("click", toggleModal1);
    window.addEventListener("click", windowOnClick1);
  
  }

//login modal
  function loginModal() {
    const modal2 = document.getElementById("modal-login");
    const trigger2 = document.getElementById("trigger-login");
    const closeButton2 = document.getElementById("close-login");

    function toggleModal2() {
      modal2.classList.toggle("show-modal");
    }

    function windowOnClick2(event) {
      if (event.target === modal2) {
        toggleModal2();
      }
    }

    trigger2.addEventListener("click", toggleModal2);
    closeButton2.addEventListener("click", toggleModal2);
    window.addEventListener("click", windowOnClick2);
  }

  function showMainPage() {
    document.getElementById('main-page').style.display = ""
    document.getElementById('login-page').style.display = "none"
    const createModal = document.getElementById('modal-create')
    createModal.style.display = 'none'
    const loginModal = document.getElementById('modal-login')
    loginModal.style.display = 'none'
  }

  //listen for login 
  function listenForLoginSubmit() {
    const loginSubmit = document.getElementById('login')

    loginSubmit.addEventListener('submit', event => {
      event.preventDefault();
      const runnerName = event.target.name.value;
      getRunner(runnerName);   
         
    })
  }

  //fetches runner
  function getRunner(runnerName) {
    
    fetch('http://localhost:3000/runners')
      .then(response => response.json())
      .then(allRunners => {

        if (allRunners.error) {
          throw 'Error. Please try again.'
        } 

        runner = allRunners.find(runner => {
          return runner.name === runnerName
        })

        if (runner) {
          renderRunner(runner);
          showMainPage();
        } else {
          throw 'No Runner Found';
        }
      })
      .catch(error => alert(error))
  }

  //renders runner to screen   
  function renderRunner(runner) {
    const welcomeHeader = document.getElementById('welcome')
    welcomeHeader.textContent = `Welcome, ${runner.name}`
    //check if a goal exists:
    checkRunnerGoal(runner)
  }

  //function to check if a goal exists (do we need to have an option whether a goal is completed? )
  function checkRunnerGoal(runner) {
    const runnerId = runner.id
    
    fetch('http://localhost:3000/goals')
      .then(response => response.json()) 
      .then(allGoals => {

        runnerGoal = allGoals.find(goal => {
          return goal.runner_id === runnerId
        })
  

        if (runnerGoal) {
          showGoalProgressMeter();
          } else {
          showAddGoal();
        }

      })
  }

// show goal progress if goal is created
  function showGoalProgressMeter() {
    document.getElementById('goal-meter').style.display = ""
    document.getElementById('new-goal').style.display = "none"
  }

  function showAddGoal() {
    document.getElementById('goal-meter').style.display = "none"
    document.getElementById('new-goal').style.display = ""
  }


  //listen for create
  function listenForCreateSubmit() {
    const createSubmitButton = document.getElementById('create');
    createSubmitButton.addEventListener('submit', event => {
      event.preventDefault();
      const runnersName = event.target.name.value;
      createRunner(runnersName)
      // showMainPage();
      
    })
  }

  function createRunner(runnerName) {
    fetch('http://localhost:3000/runners')
      .then(response => response.json())
      .then(allRunners => {

        if (allRunners.error) {
          throw 'Error. Please try again.'
        } 

        runner = allRunners.find(runnerr => {
          return runnerr.name === runnerName
        })
        if (runner) {
          renderRunner(runner);
          showMainPage();
          throw 'You already have an account.'
        } else {
          fetch('http://localhost:3000/runners', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
              name: runnerName
            })
          }).then(resp => resp.json())
            .then(runnerr => {
              renderRunner(runnerr);
              showMainPage();
              runner = runnerr
            });
        }
      })
      .catch(error => alert(error))
  }

  function addRunModal() {
    const modal3 = document.getElementById("modal-add-run");
    const trigger3 = document.getElementById("trigger-add-run");
    const closeButton3 = document.getElementById("close-add-run");

    function toggleModal3() {
      modal3.classList.toggle("show-modal");
    }

    function windowOnClick3(event) {
      if (event.target === modal3) {
        toggleModal3();
      }
    }
    trigger3.addEventListener("click", toggleModal3);
    closeButton3.addEventListener("click", toggleModal3);
    window.addEventListener("click", windowOnClick3);
  }

  // new goal for modal
  function newGoalModal() {
    initialGoalView();
    const modal4 = document.getElementById("modal-goal");
    const trigger4 = document.getElementById("trigger-goal");
    const closeButton4 = document.getElementById("close-goal");

    function toggleModal4() {
      modal4.classList.toggle("show-modal");
    }

    function windowOnClick4(event) {
      if (event.target === modal4) {
        toggleModal4();
      }
    }


    trigger4.addEventListener("click", toggleModal4);
    closeButton4.addEventListener("click", toggleModal4);
    window.addEventListener("click", windowOnClick4);
  }

  function goalCreate() {
    const goalCategory = document.getElementById('goal-category')
    goalCategory.addEventListener('change', event => {
      const categoryType = event.target.value;

      if (categoryType === 'pace') {
        showPaceEntry();
      } else if (categoryType === 'mileage') {
        showMileageEntry();
      }
    })
  }

  function initialGoalView() {
    document.getElementById('pace-div').style.display = "none"
    document.getElementById('mileage-div').style.display = "none"
  }

  function showPaceEntry() {
    document.getElementById('pace-div').style.display = ""
    // document.getElementById('new-goal').style.display = "none"
    document.getElementById('mileage-div').style.display = "none"
  }

  function showMileageEntry() {
    document.getElementById('pace-div').style.display = "none"
    // document.getElementById('new-goal').style.display = "none"
    document.getElementById('mileage-div').style.display = ""
  }

  function listenForRunSubmit() {
    const runForm = document.getElementById('run-form')
    runForm.addEventListener('submit', e => {
      e.preventDefault()
      const min = e.target.minutes.value
      const sec = e.target.seconds.value
      const distance = e.target.distance.value
      const rating = e.target.rating.value
      const date = e.target.date.value
      const run = {
        pace: `${min}.${sec}`,
        distance: distance,
        rating: rating,
        date: date
      }
      postRunToDatabase(run)
      const runModal = document.getElementById('modal-add-run')
      runModal.style.display = 'none'
    })
  }

  function postRunToDatabase(run) {
    fetch('http://localhost:3000/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        distance: run.distance,
        pace: run.pace,
        date: run.date,
        rating: run.rating,
        goal_id: runnerGoal.id // need to change this to current goal
      })
    }) // need to call on function to update goal status
  }


  function listenForGoalSelection() {
    const goalCategory = document.getElementById('goal-category')
    goalCategory.addEventListener('change', event => {
      const goalType = event.target.value
  
      listenForGoalSubmission(goalType) 
      // 

    })
  }

  function listenForGoalSubmission(goalType) {
    const goalDiv = document.getElementById('add-goal')
    goalDiv.addEventListener('submit', event => {
      event.preventDefault();

      const category = goalType;
      let value;

      if (goalType === 'pace') {
        const min = event.target.minutes.value
        const sec = event.target.seconds.value
        value = `${min}.${sec}`
      } else if (goalType === 'mileage') {
        value = event.target.distance.value
      }

      const newGoal = {
        category: category,
        value: value
      }

      postGoalToDatabase(newGoal);
    })
  }

  function postGoalToDatabase(newGoal) {
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        category: newGoal.category,
        value: newGoal.value,
        active: true,
        runner_id: runner.id
      })
    })      
    .then(response => response.json())
    .then(postedGoal => {
      console.log(postedGoal)
    })
  }



  function editAccountModal() {
    const modal5 = document.getElementById("modal-edit");
    const trigger5 = document.getElementById("trigger-edit");
    const closeButton5 = document.getElementById("close-edit");

    function toggleModal5() {
      modal5.classList.toggle("show-modal");
    }

    function windowOnClick5(event) {
      if (event.target === modal5) {
        toggleModal5();
      }
    }

    trigger5.addEventListener("click", toggleModal5);
    closeButton5.addEventListener("click", toggleModal5);
    window.addEventListener("click", windowOnClick5);
  }

  function listenForEditSubmit() {
    const editForm = document.getElementById('edit')
    editForm.addEventListener('submit', e => {
      e.preventDefault()
      const newName = e.target.name.value
      patchToDatabase(newName);
    })
  }

  function patchToDatabase(newName) {
    fetch(`http://localhost:3000/runners/${runner.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newName
      })
    }).then(resp => resp.json())
    .then(runner => { 
      renderRunner(runner)
      const editModal = document.getElementById('modal-edit')
      editModal.style.display = 'none'
      editAccountModal()

    })
  }

  function resetShowPage() {
    showLoginPage();
    createAccountModal();
    loginModal();
  }

  function addEventListenerDeleteAccount() {
    const deleteButton = document.getElementById('delete')
    deleteButton.addEventListener('click', e => {
      fetch(`http://localhost:3000/runners/${runner.id}`, {
        method: 'DELETE'
      }).then(resetShowPage())
    })
    
  }

})();
