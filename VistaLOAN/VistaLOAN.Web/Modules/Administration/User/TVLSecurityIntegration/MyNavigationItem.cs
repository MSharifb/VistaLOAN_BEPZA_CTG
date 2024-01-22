using Serenity.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VistaLOAN
{
    public class MyNavigationItem : NavigationItem
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public int ModuleId { get; set; }
        public int Serial { get; set; }

        public List<MyNavigationItem> Children_ { set { Children.Clear(); if (value != null) Children.AddRange(value); } }

        public void AddChildren(IEnumerable<MyNavigationItem> vals)
        {
            Children.AddRange(vals);
        }


    }

}