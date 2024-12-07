const MyProfile = () =>{
    return(
        <div className ="p-5 m-5 border-8 border-indigo-700 bg-zinc-400">
            <strong>
                My Profile
            </strong>
            <h1>
            Name : Sarawut Rungwongwat
            </h1>
            <h1>
            Student Code : 026740491607-9
            </h1>
            <MyEducation />
        </div>
    )
}

const MyEducation = () => {
    return (
        <div>
            <strong> Educations 

            </strong>
            <ul className="list-disc">
                <li>
                    RMUTTO 2024-Present
                </li>
                <li>
                    Information Technology
                </li>
            </ul>
        </div>
    )
}

export default MyProfile

