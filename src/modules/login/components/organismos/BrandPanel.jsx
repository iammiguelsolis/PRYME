import PRYME from '../../../../assets/PRYME_login.svg'

const TopLeftStairs = () => {
  return (
    <div className="absolute top-0 left-0">
      <div className="relative">
        <div className="absolute top-4 left-0 w-40 h-10 bg-secondary-01 z-10"></div>
        
        <div className="absolute top-12 left-0 w-36 h-10 bg-primary-02 z-20"></div>
        
        <div className="absolute top-20 left-0 w-20 h-10 bg-secondary-02 z-30"></div>
      </div>
    </div>
  );
};

const BottomRightStairs = () => {
  return (
    <div className="absolute bottom-0 right-0">
      <div className="relative">
        <div className="absolute bottom-20 right-0 w-20 h-10 bg-secondary-01 z-10"></div>
        
        <div className="absolute bottom-12 right-0 w-36 h-10 bg-primary-02 z-20"></div>
        
        <div className="absolute bottom-4 right-0 w-40 h-10 bg-secondary-02 z-30"></div>
      </div>
    </div>
  );
};

export const BrandPanel = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-8 overflow-hidden bg-white">
      
      <TopLeftStairs />
      <BottomRightStairs />
      
      <img src={PRYME} alt="PRYME" className="w-full max-w-md object-contain z-40 relative" />
    </div>
  );
};