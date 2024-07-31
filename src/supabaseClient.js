const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadToSupabase = async (path, buffer) => {
  const { data, error } = await supabase.storage
    .from("pdv")
    .upload(path, buffer);

  if (error) {
    throw new Error("Falha ao enviar arquivos");
  }

  const getPublicUrl = await supabase.storage
    .from("pdv")
    .getPublicUrl(`${path}`);

  if (getPublicUrl.data) {
    return getPublicUrl.data.publicUrl;
  }

  return null;
};

module.exports = {
  uploadToSupabase,
  supabase
};
