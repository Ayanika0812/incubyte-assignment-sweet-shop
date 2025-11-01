import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-8">🍭</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Oops! This sweet treat doesn't exist
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you've wandered into the wrong candy aisle. 
            Don't worry, we'll help you find your way back to the sweet stuff!
          </p>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
            >
              🏠 Back to Sweet Shop
            </Button>
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                ← Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;