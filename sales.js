   var _form; // type: KASForm
            var _imagePath = "";
            // Below will be called on onload of ResponseView.html 
            function onResponsePageLoad() {
                KASClient.App.registerHardwareBackPressCallback(function(){
                    KASClient.App.dismissCurrentScreen();
                }); 
                
                KASClient.Form.getFormAsync(function (form, error) { 
                    if (error != null) { 
                        KASClient.App.showNativeErrorMessage("Error:getFormAsync:" + error); 
                        return; 
                    } 
                    _form = form; 
                    
                    // Document title would be the form title
                    document.getElementById("title").innerHTML = _form.title;
                }); 
            } 
     
            function submitData() { 
                var selectedOption = getSelectedOption(); 
                var remark = document.getElementById("description").value;
                var datePicked = document.getElementById("dateTextBox").value;
                var categoryDropdown = document.getElementById('dropdownTextbox').value; 
                var theDescription = document.getElementById("OtherDescriptionSet").value;
                submitFormResponse(remark, datePicked, categoryDropdown, theDescription); 
            } 
     
            function getSelectedOption() { 
                // Check which radio button is checked 
                var options = document.getElementsByName('option'); 
                for (var i = 0; i < options.length; i++) { 
                    if (options[i].checked) { 
                        return parseInt(options[i].value); 
                    } 
                } 
            } 
     
            // Below will be called when responder submits a new response 
            function submitFormResponse(remark) { 
                if (remark == null || remark == "") { 
                    KASClient.App.showNativeErrorMessage("Please fill Vendor's Name"); 
                } 
                //else if (selectedOption == "") { 
                //     KASClient.App.showNativeErrorMessage("Please select one option"); 
                // } 
                else { 
                    // For submitting response a question-answer 
                    // map is required, lets create that! 
                    var questionToAnswerMap = JSON.parse("{}"); 
                    // questionToAnswerMap[0] = selectedOption; 
                    questionToAnswerMap[0] = remark;
                    questionToAnswerMap[1] = datePicked;
                    questionToAnswerMap[2] = categoryDropdown;
                    questionToAnswerMap[3] = theDescription; 
                    questionToAnswerMap[4] = _imagePath;
                    var responseId = null; 
                    var isEditingPreviousResponse = false;
                    
                    // Finally submit the response 
                    KASClient.Form.sumbitFormResponse(
                        questionToAnswerMap, 
                        null /* responseId */, 
                        false /* isEditingPreviousResponse*/ , 
                        true /* showInChatCanvas */, 
                        false /* isAnonymous */); 
                } 
            }
            
            function onImageClicked() {
                KASClient.App.showImagePickerAsync(function(imagePath, error){
                    if (error == null && imagePath != "") {
                        _imagePath = imagePath;
                        document.getElementById('image-control').src = _imagePath;
                    }
                });
            }
            