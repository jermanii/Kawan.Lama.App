using Kawan.Lama.Architecture.Todo;
using Kawan.Lama.Model.Base;
using Kawan.Lama.Model.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Kawan.Lama.App.Controllers
{
    public class TodoController : Controller
    {
        private readonly ITodoServices _service;
        public TodoController(ITodoServices service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            try
            {
                ToDoViewModel model = new ToDoViewModel();
                model.ToDos = _service.GetTodoList();

                return View(model);
            }
            catch (Exception err)
            {
                ErrorModel error = new ErrorModel(); error.ErrorMessage = err.Message + err.StackTrace; return View("Error", error);
            }
        }

        [HttpPost]
        public IActionResult Check(Guid guid, bool isCheck)
        {
            try
            {
                _service.CheckAction(guid, isCheck);

                return Ok(new { redirectUrl = Url.Action("Index") });
            }
            catch (Exception err)
            {
                ErrorModel error = new ErrorModel(); error.ErrorMessage = err.Message + err.StackTrace; return View("Error", error);
            }
        }
        [HttpPost]
        public IActionResult Submit(string description)
        {
            try
            {
                _service.SubmitAction(description);
                return Ok(new { redirectUrl = Url.Action("Index") });
            }
            catch (Exception err)
            {
                ErrorModel error = new ErrorModel(); error.ErrorMessage = err.Message + err.StackTrace; return View("Error", error);
            }
        }
        [HttpPost]
        public IActionResult Deleted(Guid guid)
        {
            try
            {
                _service.DeletedAction(guid);
                return Ok(new { redirectUrl = Url.Action("Index") });
            }
            catch (Exception err)
            {
                ErrorModel error = new ErrorModel(); error.ErrorMessage = err.Message + err.StackTrace; return View("Error", error);
            }
        }
    }
}
