const formattedDateTime = new Date().toLocaleString('th-TH', { hour12: false });

export const toDoItem = [
    {    
    id: 1,
    title: "เรียนเช้า",
    created: formattedDateTime,
    completed: true
},
{    
    id: 2,
    title: "เรียนบ่าย",
    created: formattedDateTime,
    completed: true
},
{    
    id: 3,
    title: "เรียนเย็น",
    created: formattedDateTime,
    completed: true
}


];