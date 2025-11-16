import PRYME from '../../../assets/PRYME_fondoAzul.svg'

export const Footer =  () => (
  <footer className='w-full bg-secondary-01'>
    <div className='max-w-7xl mx-auto p-6 flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-4'>
      <img src={PRYME} alt="PRYME" width={120} className="object-contain" />
      <p className="text-sm sm:text-base text-text-03 text-center">
        © 2025 PRYME - Todos los derechos reservados
      </p>
    </div>
  </footer>
)