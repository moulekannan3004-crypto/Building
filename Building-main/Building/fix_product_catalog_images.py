import os
import re

project_dir = r"c:\Users\Moule Kannan\Desktop\Building"
products_path = os.path.join(project_dir, "products.html")

# Map product ID to real image asset path
prod_images = {
    "1": "./assets/images/prod_opc53_cement.jpg",
    "2": "./assets/images/cat_cement.jpg",
    "3": "./assets/images/prod_tmt_steel.jpg",
    "4": "./assets/images/cat_steel.jpg",
    "5": "./assets/images/cat_bricks.jpg",
    "6": "./assets/images/prod_aac_blocks.jpg",
    "7": "./assets/images/cat_tiles.jpg",
    "8": "./assets/images/cat_tiles.jpg",
    "9": "./assets/images/cat_plywood.jpg",
    "10": "./assets/images/cat_electrical.jpg",
    "11": "./assets/images/cat_plumbing.jpg"
}

if os.path.exists(products_path):
    with open(products_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find product card img-container and replace placeholder icons
    # e.g., data-id="1" ... <div class="img-container..."><i class="fa-solid fa-mountain... font-5xl..."></i>
    for pid, img_src in prod_images.items():
        # Match product-card with data-id="pid"
        card_pattern = re.compile(
            r'(<div class="product-card[^"]*data-id="' + pid + r'"[^>]*>[\s\S]*?<div class="img-container[^"]*">)[\s\S]*?(<i class="fa-solid[^">]*"></i>)',
            re.MULTILINE
        )
        def replacer(m):
            header = m.group(1)
            return f'{header}\n              <img src="{img_src}" alt="Material Product" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">'

        content, count = card_pattern.subn(replacer, content)
        print(f"Product Card {pid}: replaced icon with {img_src} (count: {count})")

    with open(products_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated all product cards in products.html with real images!")
