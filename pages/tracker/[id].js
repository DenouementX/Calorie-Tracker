import {getAllTrackerIds} from '../../lib/tracker'

export default function Tracker({date}) {
    return (
        <p>This is a dummmy tracker page for {date}</p>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllTrackerIds();
    return {
      paths,
      fallback: false,
    };
}
  
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    var date = params.id;
    return {
        props: {
            date
        }
    };
}