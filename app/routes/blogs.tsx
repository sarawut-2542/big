const myBlogs = () => {
    let title = 'EP2'
    let rating = 5
    let descriptTion = 'เกี่ยวกับตัวฉัน'

  

    

    const Comment = ({avatar, message,author,top }) => {
        return (
            <div>
                <GetTop
                top = {top}
                />
                <img src={avatar}
                title={author}
                width={50}
                />
                <p>{message}</p>
                <i>{author}
                    <hr /><br />
                </i>
            </div>
        )
    }

    const  GetTop = ({top}) => {
        if(top){
            return '\u2764'
        }
        else{
            return '';
        }
           
    }

    // const getRating = () => {
    //     return <span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>
    // }
    
    const getRating2 = (r) => {
        
        let msg = ''
        for(let i = 0; i < r ; i++){
            msg = msg + '\u2B50'         
        }
        return <span>{msg}</span>;
        //return <span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>
    }
    return (
        <div className="m-3">
            <p><strong>
                หัวข้อ : {title}
                </strong>
            </p>
            <p>
            <strong>
                รายละเอียด : {descriptTion}
            </strong>

            </p>
            <p>
            <strong>
                ชื่นชอบ : {getRating2(rating)}
            </strong>

            </p>

            <p>
            <strong>
                อื่นๆ : ....
            </strong>

            </p>

            <h1 className="text-lg font-bold">Comments</h1>
            <br />
            <Comment
                avatar="public\image\snowman.png"
                message='hello world'
                author='sarawut'
                top = {true}
                />
                <Comment
                avatar="public\image\snowman.png"
                message='hello world'
                author='sarawut'
                top = {true}
                />
            

            
        </div>
    )

    
}



export default myBlogs;