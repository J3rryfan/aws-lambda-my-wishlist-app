import Logo from './logo';

export default function Header() {
  return (
    <div className='py-6'>
      <div className='container flex max-w-3 items-center justify-center'>
        <Logo />
      </div>
    </div>
  );
}
