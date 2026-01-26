import logo from '../assets/logo.svg'

export default function NavigationBar() {


    return (
        <nav className="w-full bg-sky-500">
            <div className="w-full h-16 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img className="logo" src={logo} />
                    <h1>Well Analytics</h1>
                </div>
                <p className='mr-5'>Powered by <a href='https://pypi.org/project/pta-learn/' target="_blank" rel="noopener noreferrer"><b>pta-learn</b></a></p>
            </div>
        </nav>
    )
}