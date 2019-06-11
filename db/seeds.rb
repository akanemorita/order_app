# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# サンプルデーター作成 Company
Company.create!(name:  "American Vape",
             zipcode1: "277",
             zipcode2: "1168",
             state: "千葉県",
             city: "柏市",
             address: "南柏",
             address2: "3-3-1",
             tel: "0439995938",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)


Company.create!(name:  "セレーノ",
             zipcode1: "276",
             zipcode2: "1106",
             state: "千葉県",
             city: "柏市",
             address: "本町",
             address2: "1-2",
             tel: "0431183094",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)


Company.create!(name:  "いまる",
             zipcode1: "275",
             zipcode2: "1131",
             state: "千葉県",
             city: "柏市",
             address: "本町西",
             address2: "2-1-2",
             tel: "0437836823",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)


Company.create!(name:  "BASTU SKATEBOARD SHOP",
             zipcode1: "274",
             zipcode2: "1123",
             state: "千葉県",
             city: "柏市",
             address: "泉町",
             address2: "4-3-11",
             tel: "0437849331",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)


Company.create!(name:  "FREY's Famous Pizzeria",
             zipcode1: "112",
             zipcode2: "0012",
             state: "東京都",
             city: "港区",
             address: "六本木一丁目",
             address2: "1-2-12",
             tel: "034483093",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)

Company.create!(name:  "AKEBI",
             zipcode1: "279",
             zipcode2: "1167",
             state: "千葉県",
             city: "柏市",
             address: "柏",
             address2: "3-6-26",
             tel: "045899932",
             updated_at: Time.zone.now,
             created_at: Time.zone.now)

