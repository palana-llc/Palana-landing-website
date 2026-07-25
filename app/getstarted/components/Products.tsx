import './Products.css';
import ProductButton from './ProductButton';
import Divider from '../../components/Divider';

type Props = {
    refs: React.RefObject<HTMLDivElement | null>[];
    setMode: (mode: string) => void;
}

export default function Products({refs, setMode} : Props) {
    return (
        <div className="products-container">
            <div className="products-container-inner">
                <div className="products-header">
                    Our Products
                </div>
                <div className="products-group">
                    <ProductButton
                        title="Students"
                        content="
                        A website allowing the existing service dispatchers to help request rides on behalf of a caller
                        "
                        color="#AFE6A6"
                        targetRef={refs[0]}
                        onModeSelect={() => setMode('Students')}
                    />
                    <ProductButton
                        title="Drivers"
                        content="
An Uber-like app for service drivers to keep track of ride requests and trip information.
"
                        color="#94D2E6"
                        targetRef={refs[0]}
                        onModeSelect={() => setMode('Schools')}
                    />
                    <ProductButton
                        title="Dispatch"
                        content="
An Uber-like app for students and staff to request rides, predict driver arrival times, and track their ride route.
"
                        color="#F49E4C"
                        targetRef={refs[1]}
                    />
                </div>
            </div>

            <Divider></Divider>
        </div>
    );
}