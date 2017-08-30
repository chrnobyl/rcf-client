class ComplaintCategories {
  constructor(){}
  static getGroupedComplaints() {
    $.ajax({
      url: 'http://localhost:3000/api/v1/complaints/grouped',
      success: function(data) {
        populateDropDown(data)
      }
    })
  }
}

function populateDropDown(data){
  let options = data.map(function(element){
    return `<option value="${element.label}">${element.label}</option>`
  })
  $(".browser-default").html(options)
}
