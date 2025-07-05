-- Future Quality Module Schema (Example of extensibility)

-- Quality Defect Categories
CREATE TABLE quality_defect_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    severity VARCHAR(20), -- 'critical', 'major', 'minor'
    cost_impact DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quality Inspections (extends data_entries)
CREATE TABLE quality_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_entry_id UUID REFERENCES data_entries(id),
    product_id UUID REFERENCES products(id),
    inspection_type VARCHAR(50), -- 'incoming', 'in_process', 'final'
    sample_size INTEGER,
    defects_found INTEGER,
    inspector_id UUID REFERENCES operators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quality Defects (extends data_entries)
CREATE TABLE quality_defects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_entry_id UUID REFERENCES data_entries(id),
    inspection_id UUID REFERENCES quality_inspections(id),
    defect_category_id UUID REFERENCES quality_defect_categories(id),
    quantity INTEGER,
    root_cause TEXT,
    corrective_action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SPC (Statistical Process Control) Data
CREATE TABLE quality_spc_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    machine_id UUID REFERENCES machines(id),
    product_id UUID REFERENCES products(id),
    measurement_parameter VARCHAR(100),
    measured_value DECIMAL(10,4),
    upper_control_limit DECIMAL(10,4),
    lower_control_limit DECIMAL(10,4),
    target_value DECIMAL(10,4),
    measured_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
