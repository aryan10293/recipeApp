interface HeaderProps{
    text:string,
    margin:string
}

const Header:React.FC<HeaderProps> = ({text}) => {
    return ( 
        <div style={{'width':'100%','display':'flex','flexDirection':'column','alignItems':'center','margin':"50px 0 0 0"}}>
            <h2 style={{'fontSize':'2rem','fontWeight':'300','color':'black','letterSpacing':'2px','borderRadius':'5px','margin':'25px'}}>{text}</h2>
            <hr style={{'height':'1px','width':'50%','margin':'0px'}} />
        </div>
     );
}
 
export default Header;