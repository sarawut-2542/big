const formattedDateTime = new Date().toLocaleString('th-TH', { hour12: false });

export const toDoItem = [
    {    
    id: 1,
    title: "กิจกรรรมจ้า",
    created: formattedDateTime,
    completed: true
},
{    
    id: 2,
    title: "กิจกรรรมจ๊ะเอ๋",
    created: formattedDateTime,
    completed: true
},
{    
    id: 3,
    title: "กิจกรรรมรึเปล่า",
    created: formattedDateTime,
    completed: false
}


];