// Unauthorized Page

export default function Unauthorized({router}) {

    const redirectHome = () => {
        router.push("/");
    }

    return (
        <div>
            <h1 className='text-3xl xs:text-2xl pb-3 underline underline-offset-8'>You are not signed in : (</h1>
            <p className="text-xl pb-3 px-8">This may have happened because you refreshed the page or tried to manually access a tracker url instead of using the calendar dropdown</p>
            <button className='rounded-xl px-2 py-1 shadow-md shadow-gray bg-white border transition ease-in-out delay-50 hover:scale-110 hover:bg-hoverBlue hover:border-hoverGoogle border-googleBorderGray' onClick={redirectHome}>Go to sign-in page</button>
        </div>
    )
}