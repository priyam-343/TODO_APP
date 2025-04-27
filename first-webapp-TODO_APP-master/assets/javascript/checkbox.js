

/*$(".custom-checkbox").click(function(){
    console.log($(this).attr("id"));alert(`hi`);
  });*/



  let element=$(".custom-checkbox");

  element.click(function(e){
    e.preventDefault;
    
    let taskid=$(this).attr("id");
    

    $.ajax({
        type:`post`,
        url:"/users/toggle_check",
        data:{taskid:$(this).attr("id")},   // this keyword arrow function  m kam nhi krta
        success:(data)=>{
                   
            

        }
    })

  });
  