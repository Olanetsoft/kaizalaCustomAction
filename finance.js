// Globals
var _form; // type: KASForm
var imagePath = "";

// Below will be called on onload of SummaryView.html
function onSummaryPageLoad() {
    KASClient.Form.getFormAsync(function (form, error) {
       if (error != null) {
          KASClient.App.showNativeErrorMessage("Error:getFormAsync:" + error);
          return;
       }
       _form = form;

      // Update the title in the form
      document.getElementById("title").innerText = _form.title;

      KASClient.Form.getMyFormResponsesAsync(function(response, error){
          if (error != null) {
                KASClient.App.showNativeErrorMessage("Error fetching response - " + error);
                return;
             }
          
          // Fetch rating and feedback from questionToAnswerMap in response object
          //var rating = response[0].questionToAnswerMap[0];
          var feedback = response[0].questionToAnswerMap[0];
          var feedback1 = response[1].questionToAnswerMap[1];
          var feedback2 = response[2].questionToAnswerMap[2];
          var feedback3 = response[3].questionToAnswerMap[3];
          var feedback4 = response[4].questionToAnswerMap[4];


          if (response[0].questionToAnswerMap[4] != "") {
              imagePath = response[0].questionToAnswerMap[4];
              document.getElementById('image-control').src = imagePath;
          }

          // Render the answer on the UI
          //document.getElementById("rating").innerHTML = rating;
          document.getElementById("feedbacktext").innerHTML = feedback;
          document.getElementById("dateText").innerHTML = feedback1;
          document.getElementById("categoryText").innerHTML = feedback2;
          document.getElementById("descriptionText").innerHTML = feedback3;
          document.getElementById("amountText").innerHTML = feedback4;

          })
    });
 }
 
 function openImage() {
     if (imagePath != "") {
         KASClient.App.showImageImmersiveView([imagePath], 0)
     }
 }