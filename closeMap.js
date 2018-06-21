Qualtrics.SurveyEngine.addOnload(function()
{
 
	var elementExists = document.getElementById("mapdiv");
	document.body.removeChild(elementExists);
	
	var textExists =document.getElementById("textdiv");
	document.body.removeChild(textExists);

});
