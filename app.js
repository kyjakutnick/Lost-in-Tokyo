const Highlight = ({ color, children}) => (
    <span class={`relative highlight highlight-${color}`}>
        <span class="relative z-2">{children}</span>
    </span>
)

const Intro = () => (
<div className="m-auto-ns f4 f3-m f2-l tc w-80-1 normal">
    <div 
    className="mb3 mb4-ns">
        <Highlight color='aqua'>Lost in Tokyo</Highlight> is a directory of fun places to see, play in and <Highlight color='yellow'>explore</Highlight>, in <Highlight color='blue'>Tokyo</Highlight>, Japan.{' '}
    </div>
 
    <div>
    From <Highlight color='blue'>museums</Highlight> and <Highlight color='blue'>galleries</Highlight>, to <Highlight color='pink'>Robot Restaurants</Highlight> and <Highlight color='pink'>kitten cafes</Highlight>, Tokyo is the gift that keeps on giving. <Highlight color='yellow'>Dattebayo!</Highlight> {' '}
    </div>
</div>
);

// the ({classname, href, chidlren}) grabs our properties directly
// it means you don't have tot type out props.className
const NavItem = ({ className, href, children , logo}) => (
    <li className={`mh2-ns f6 f4-1 tc ${className}`}>
        <a className="white no-underline" href={href}>
            {/* here we check for the logo prop, if we have it we render out our logo otherwise
            we render out our regular nav textt (children prop) */}
            {logo ? <img src="../images/logo.svg" className="db center logo"  />: children}
        </a>
    </li>
);

const Nav = () => (
    <nav className="pt3 pt4-ns mb4 mb0-ns">
        <ul className='list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0'>
            {menu.map(item => <NavItem {...item} />)}
        </ul>
    </nav>
);

const Overlay = ({showInfo, title, description}) => (
    <div className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
                        style={{
                            // we do a test to see whether our showInfo state is true
                            // if it is, we change the transform to be none, otherwise -100%
                            transform: showInfo ? 'none' : 'translateY(-100%)'
                        }}>
                    <div>
                    {/* <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">{title}</h1> */}
                    <p className="lh-title lh-copy-ns mv0 black f6 measure-l">{description}</p>
                    </div>
     </div>
)

const Classes =  "f4 f3-ns mt0 mb2 regular black normal lh-title"
    return link
    ? <a href={link}><h1 className={classes}>{title}</h1></a>
    : <h1 className={classes}>{title}</h1>

// we can also create components as classes
// these give us more advanced funcitonality and features such as the component lifecycle
// as well as reacts in-built state

class Attraction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showInfo: false
        };
        // here we tell our toggleInfo about this by using bind 
        // otherwise things like setSte will not work 
        this.toggleInfo = this.toggleInfo.bind(this);
        this.closeInfo = this.closeInfo.bind(this);
    } 

    // this is our own method
    toggleInfo() {
        this.setState((prevState, props) => ({
            // here we invert our showInfo boolean by using the 
            // previous state and the ! exclamation mark
            showInfo: !prevState.showInfo
        }));
    }

    closeInfo() {
        // here we use setState way because we didn't need access to the previous statte, we're justt force setting the
        // showInfo state
        this.setState({
            showInfo: false
        });
    }

    render() {
       const {title, link, description, className, image} = this.props;
       const {showInfo} = this.state;

        return (
                <div
                className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${className}`}
                onMouseEnter= {this.toggleInfo}
                // this runs when our mouse leaves the attraction element
                onMouseLeave={this.closeInfo}
                >
                <div className="relative">
                    {/* here we remember to pass along all of our props and state */}
                    <Overlay {...this.props} {...this.state}></Overlay>
                    <img src={`../images/${image}`} className="db" />
                </div>
                </div>
        )
    }
}

const App = () => (
    <div>
      <div className="min-vh-100 ph4 flex flex-column">
        {/* our navigation component */}
        <Nav />
        <Intro />
      </div>
      <div className="flex flex-wrap container">
        {attractions.map(attraction =>
            <Attraction {...attraction}/>
            )}
        </div>
    </div>
  )

ReactDOM.render(<App/>, document.getElementById('root'));
