"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Save, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Treatment {
  _id?: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  popular: boolean;
}

const categories = [
  "Injectables & Wrinkle Relaxers",
  "Dermal Fillers & Skin Boosters",
  "Facials & Skin Health",
  "Microneedling & Skin Resurfacing",
  "Laser Hair Removal",
  "Body Sculpting & Contouring",
];

export default function AdminTreatmentsPage() {
  const router = useRouter();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    loadTreatments();
  }, [router]);

  const loadTreatments = () => {
    fetch("/api/admin/treatments")
      .then((r) => r.json())
      .then((d) => {
        if (d.treatments) setTreatments(d.treatments);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleSave = async () => {
    if (!selectedTreatment) return;
    setSaving(true);
    
    const method = selectedTreatment._id ? "PUT" : "POST";
    const r = await fetch("/api/admin/treatments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedTreatment),
    });

    if (r.ok) {
      toast.success("Treatment saved");
      loadTreatments();
      setIsEditing(false);
      setSelectedTreatment(null);
    } else {
      toast.error("Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this treatment?")) return;
    const r = await fetch(`/api/admin/treatments?id=${id}`, { method: "DELETE" });
    if (r.ok) {
      toast.success("Treatment deleted");
      loadTreatments();
    } else {
      toast.error("Delete failed");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (selectedTreatment) {
        setSelectedTreatment({
          ...selectedTreatment,
          image: reader.result as string,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <AdminLayout title="Treatments">
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="text-gold animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isEditing && selectedTreatment) {
    return (
      <AdminLayout title={selectedTreatment._id ? "Edit Treatment" : "New Treatment"}>
        <div className="max-w-2xl space-y-6">
          <div className="admin-card space-y-4">
            <div>
              <label className="admin-label">Treatment Name *</label>
              <input
                type="text"
                value={selectedTreatment.name}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, name: e.target.value })
                }
                className="admin-input"
                placeholder="e.g., Botox"
              />
            </div>

            <div>
              <label className="admin-label">Category *</label>
              <select
                value={selectedTreatment.category}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, category: e.target.value })
                }
                className="admin-input"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label">Description *</label>
              <textarea
                value={selectedTreatment.description}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, description: e.target.value })
                }
                className="admin-input resize-none"
                rows={3}
                placeholder="Brief description of the treatment"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Price *</label>
                <input
                  type="text"
                  value={selectedTreatment.price}
                  onChange={(e) =>
                    setSelectedTreatment({ ...selectedTreatment, price: e.target.value })
                  }
                  className="admin-input"
                  placeholder="From $250"
                />
              </div>

              <div>
                <label className="admin-label">Duration *</label>
                <input
                  type="text"
                  value={selectedTreatment.duration}
                  onChange={(e) =>
                    setSelectedTreatment({ ...selectedTreatment, duration: e.target.value })
                  }
                  className="admin-input"
                  placeholder="30-45 min"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Treatment Image</label>
              <div className="space-y-3">
                {selectedTreatment.image && (
                  <div className="relative inline-block">
                    <img
                      src={selectedTreatment.image}
                      alt="Treatment"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gold/20"
                    />
                    <button
                      onClick={() =>
                        setSelectedTreatment({ ...selectedTreatment, image: "" })
                      }
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold rounded-lg cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span className="font-inter text-sm">
                    {selectedTreatment.image ? "Change Image" : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTreatment.popular}
                  onChange={(e) =>
                    setSelectedTreatment({ ...selectedTreatment, popular: e.target.checked })
                  }
                  className="accent-gold"
                />
                <span className="font-inter text-sm text-soft-taupe">
                  Mark as Popular Treatment
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="admin-btn-primary flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Treatment
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedTreatment(null);
              }}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Treatments"
      description="Manage treatment images and details"
      actions={
        <button
          onClick={() => {
            setSelectedTreatment({
              name: "",
              category: "",
              description: "",
              price: "",
              duration: "",
              image: "",
              popular: false,
            });
            setIsEditing(true);
          }}
          className="admin-btn-primary"
        >
          + New Treatment
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <div
            key={treatment._id}
            className="admin-card hover:border-gold/40 transition-colors"
          >
            {treatment.image && (
              <div className="relative -mx-5 -mt-5 mb-4">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {treatment.popular && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-gold text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Popular
                  </span>
                )}
              </div>
            )}
            <div className="space-y-3">
              <div>
                <h3 className="font-playfair text-lg text-gold font-bold">
                  {treatment.name}
                </h3>
                <p className="text-xs text-soft-taupe mt-1">{treatment.category}</p>
              </div>
              <p className="text-sm text-warm-beige line-clamp-2">
                {treatment.description}
              </p>
              <div className="flex items-center justify-between text-xs text-soft-taupe pt-2 border-t border-gold/10">
                <span>{treatment.duration}</span>
                <span className="text-gold font-semibold">{treatment.price}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setIsEditing(true);
                  }}
                  className="admin-btn-secondary text-xs flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => treatment._id && handleDelete(treatment._id)}
                  className="px-3 py-1.5 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {treatments.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon size={48} className="text-gold/30 mx-auto mb-4" />
          <p className="text-soft-taupe mb-4">No treatments yet</p>
          <button
            onClick={() => {
              setSelectedTreatment({
                name: "",
                category: "",
                description: "",
                price: "",
                duration: "",
                image: "",
                popular: false,
              });
              setIsEditing(true);
            }}
            className="admin-btn-primary"
          >
            + Add Your First Treatment
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
