import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import FormTambahMateri from './form-tambah-materi'; 
import { Plus, FileText, CheckCircle2, Pencil,Trash2 } from "lucide-react"; 
import { Link, router, usePage } from '@inertiajs/react';
import FormEditMateri from './form-edit-materi';

type Category = {
  id: number;
  name: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  category?: Category;
  link_drive?: string;
};

type PageProps = {
  categories: Category[];
  courses: Course[];
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tambah dan List Materi', href: '/guru/course/list-materi' },
];

const ListMateri = () => {
  const { courses, categories } = usePage<PageProps>().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { flash } = usePage().props as any;
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccessMsg(true);
            const timer = setTimeout(() => setShowSuccessMsg(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

  const handleSimpanMateri = (
    title: string,
    category_id: string,
    description: string
  ) => {
    return {
      title,
      category_id,
      description,
    };
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEdit = (materi: Course) => {
    setSelectedCourse(materi);
    setIsEditModalOpen(true);
  };

const confirmDelete = (id: number) => {
    if (confirm("Apakah Anda yakin? Progres dan jawaban siswa pada materi ini akan ikut terhapus permanen.")) {
        router.delete(`/guru/course/destroy/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
            },
        });
    }
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">
        {showSuccessMsg && (
            <div className="max-w-6xl mx-auto mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-6 py-4 rounded-[20px] flex items-center gap-3 shadow-md">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <span className="font-semibold text-[14px]">{flash?.success}</span>
                </div>
            </div>
        )}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-emerald-600 text-white px-5 py-3 sm:py-2 rounded-xl font-bold hover:bg-emerald-500 transition shadow-md flex justify-center items-center gap-2"
          >
            <Plus size={18} />
            <span>Tambah Materi</span>
          </button>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="overflow-x-auto"> 
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-gray-600 font-bold text-sm uppercase">Materi</th>
                <th className="p-4 text-gray-600 font-bold text-sm uppercase">Kategori</th>
                <th className="p-4 text-gray-600 font-bold text-sm uppercase">Deskripsi</th>
                <th className="p-4 text-gray-600 font-bold text-sm uppercase text-center">Tautan</th>
                <th className="p-4 text-center text-gray-600 font-bold text-sm uppercase">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {courses.map((materi) => (
                <tr key={materi.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-800">{materi.title}</td>
                  <td className="p-4 text-gray-700">{materi.category?.name ?? '-'}</td>
                  <td className="p-4 text-gray-600 text-sm max-w-[200px]">
                    <p className="truncate" title={materi.description}>{materi.description}</p>
                  </td>
                  <td className="p-4 text-center">
                    {materi.link_drive ? (
                      <a href={materi.link_drive} target="_blank" className="inline-flex items-center text-blue-600 hover:underline">
                        <FileText size={18} />
                      </a>
                    ) : <span className="text-gray-300">-</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2 flex-wrap min-w-[200px]">
                      <button 
                          onClick={() => handleEdit(materi)}
                          className="p-2 bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm group"
                          title="Edit Materi"
                      >
                          <Pencil size={18} className="group-hover:scale-110 transition-transform" /> 
                      </button>

                      <button 
                        onClick={() => confirmDelete(materi.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm group"
                        title="Hapus Materi"
                      >
                        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                      </button>
                      
                      <Link 
                        href={`/guru/course/content-materi/${materi.id}?judul=${encodeURIComponent(materi.title)}&kategori=${encodeURIComponent(materi.category?.name || '')}&deskripsi=${encodeURIComponent(materi.description)}`}
                        className="group flex items-center gap-2 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                      >
                        <FileText size={16} />
                        Lengkapi Konten
                      </Link>

                      <Link 
                        href={`/guru/course/primm/list-primm/${materi.id}?judul=${encodeURIComponent(materi.title)}&kategori=${encodeURIComponent(materi.category?.name || '')}&deskripsi=${encodeURIComponent(materi.description)}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] px-3 py-1.5 rounded font-bold flex items-center gap-1 transition"
                      >
                        <Plus size={14} strokeWidth={3} />
                        Aktivitas PRIMM
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        <FormTambahMateri 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          categories={categories}
          onSimpan={handleSimpanMateri}
        />

        {selectedCourse && (
          <FormEditMateri 
            isOpen={isEditModalOpen} 
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedCourse(null);
            }} 
            categories={categories}
            course={selectedCourse} 
          />
        )}

      </div>
    </AppLayout>
  );
};

export default ListMateri;