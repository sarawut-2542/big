const myBlogs = () => {
    let title = 'xxx'
    let rating = 5
    let desciptTion = 'BBB...'

    console.log(title)

    return (
        <div className="m-3">
            <p><strong>
                หัวข้อ : {title}
                </strong>
            </p>
            <p>
            <strong>
                รายละเอียด : {desciptTion}
            </strong>

            </p>

            
        </div>
    )
}

export default myBlogs;