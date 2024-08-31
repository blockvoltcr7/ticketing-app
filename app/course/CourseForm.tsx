'use client'

const CourseForm = () => {

    function onSubmit(){
        console.log('form submitted')
    }
  return (
    <form className="border" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const duration = formData.get('duration');
        console.log('Course Name:', name, 'Duration:', duration);
        // Here you can add logic to handle the new course data
      }}>
        <input type="text" name="name" placeholder="Course Name" required />
        <input type="text" name="duration" placeholder="Course Duration" required />
        <button type="submit">Add Course</button>
      </form>
  )
}

export default CourseForm
