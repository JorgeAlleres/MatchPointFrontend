import HomeGreetings from '../../components/HomeGreetings';

function AdminPanel() {
  return (
    <div className='pt-32 flex flex-col items-center'>
      <HomeGreetings>
        {'Admin'}
      </HomeGreetings>
    </div>
  );
}

export default AdminPanel;
