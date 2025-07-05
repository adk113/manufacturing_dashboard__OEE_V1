-- Standards Module (Shared across all modules)

-- Bill of Materials
CREATE TABLE bom_headers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    version VARCHAR(20) DEFAULT '1.0',
    effective_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bom_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bom_header_id UUID REFERENCES bom_headers(id),
    material_code VARCHAR(100),
    material_name VARCHAR(255),
    quantity DECIMAL(10,4),
    unit VARCHAR(20),
    cost_per_unit DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cost Standards
CREATE TABLE cost_standards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    standard_type VARCHAR(50), -- 'electricity', 'labor', 'overhead'
    category VARCHAR(100),
    rate DECIMAL(10,2),
    unit VARCHAR(20),
    effective_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Targets
CREATE TABLE performance_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    machine_id UUID REFERENCES machines(id),
    module_name VARCHAR(50), -- 'oee', 'quality', 'cost', etc.
    metric_name VARCHAR(100), -- 'oee', 'availability', 'defect_rate', etc.
    target_value DECIMAL(10,2),
    unit VARCHAR(20),
    effective_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
