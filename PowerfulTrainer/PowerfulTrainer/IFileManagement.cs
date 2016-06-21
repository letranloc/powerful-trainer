using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PowerfulTrainer
{
    public interface IFileManagement
    {
        void SaveText(string filename, string text);
        string LoadText(string filename);
    }
}
