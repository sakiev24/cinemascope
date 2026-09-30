import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="grid min-h-[80vh] md:grid-cols-2">
        <div className="flex items-end bg-sunburst px-6 pb-12 pt-32 text-midnight sm:px-12">
            <div>
                <p className="label">Error 404</p>
                <h1 className="display mt-3 text-7xl sm:text-8xl">Lost reel</h1>
            </div>
        </div>
        <div className="flex items-start px-6 py-12 sm:px-12 md:items-end">
            <div>
                <p className="max-w-sm text-lg text-midnight-100">
                    This scene didn’t make the final cut. Let’s get you back to the good stuff.
                </p>
                <Link to="/" className="btn-primary mt-8">
                    Back to Discover
                </Link>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
